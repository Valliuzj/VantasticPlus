from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import random

app = Flask(__name__)

model = joblib.load('random_forest_model.pkl')

VALID_CATEGORIES = ['Biology', 'History', 'Culture', 'Travel', 'Art', 'Science', 'Geography']
VALID_DIFFICULTIES = ['easy', 'medium', 'hard']

FEATURE_NAMES = ['difficulty', 'category', 'like', 'answered', 'liked']

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    interactions = data['interactions']
    questions = data['questions']

    # get features from interactions
    user_features = pd.DataFrame([{
        'liked': interaction.get('liked', 0),
        'answered': interaction.get('answered', 0)
    } for interaction in interactions.values()]).mean().to_frame().T

    # get features from questions
    question_features = pd.DataFrame([{
        'id': question['id'],
        'difficulty': VALID_DIFFICULTIES.index(question['difficulty']),
        'category': VALID_CATEGORIES.index(question['category']),
        'like': question['like'],
    } for question in questions])

    # Filter out questions the user has already answered correctly
    answered_question_ids = set(interactions.keys())
    filtered_question_features = question_features[~question_features['id'].isin(answered_question_ids)]

    if filtered_question_features.empty:
        return jsonify({'error': 'No new questions to recommend'}), 400

    # Drop  'id'  - it is not a feature for prediction
    filtered_question_features = filtered_question_features.drop(columns=['id'])

    # Combine user and question features
    combined_features = pd.concat([user_features] * len(filtered_question_features), ignore_index=True)
    combined_features = pd.concat([combined_features, filtered_question_features.reset_index(drop=True)], axis=1).fillna(0)

    combined_features.columns = FEATURE_NAMES #make sure the columns are the same order as the model 

    # Predict probabilities of each question being answered correctly and liked 
    predictions = model.predict_proba(combined_features)[:, 1]  # Assuming binary classification

    # Get the indices of the top 15 questions
    top_indices = np.argsort(predictions)[-15:]

    # Randomly select one of the top 15 most likely questions so that the user gets different question even when they answer the question wrongly
    recommended_index = random.choice(top_indices)
    recommended_question = questions[filtered_question_features.index[recommended_index]]

    return jsonify({'recommended_question': recommended_question})

#fix port number for mac users
if __name__ == '__main__':
    app.run(debug=True, port=8123)
