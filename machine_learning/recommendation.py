from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import random

app = Flask(__name__)

# Load the trained model
model = joblib.load('random_forest_model.pkl')

# Define valid categories and difficulties
VALID_CATEGORIES = ['Biology', 'History', 'Culture', 'Travel', 'Art', 'Science', 'Geography']
VALID_DIFFICULTIES = ['easy', 'medium', 'hard']

# Define the feature names as used during training
FEATURE_NAMES = ['difficulty', 'category', 'like', 'answered', 'liked']

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    interactions = data['interactions']
    questions = data['questions']

    # Extract features from interactions
    user_features = pd.DataFrame([{
        'liked': interaction.get('liked', 0),
        'answered': interaction.get('answered', 0)
    } for interaction in interactions.values()]).mean().to_frame().T

    # Extract and encode features from questions
    question_features = pd.DataFrame([{
        'id': question['id'],
        'difficulty': VALID_DIFFICULTIES.index(question['difficulty']),
        'category': VALID_CATEGORIES.index(question['category']),
        'like': question['like'],
    } for question in questions])

    # Filter out questions the user has already answered
    answered_question_ids = set(interactions.keys())
    filtered_question_features = question_features[~question_features['id'].isin(answered_question_ids)]

    if filtered_question_features.empty:
        return jsonify({'error': 'No new questions to recommend'}), 400

    # Drop the 'id' column as it is not a feature for prediction
    filtered_question_features = filtered_question_features.drop(columns=['id'])

    # Combine user and question features
    combined_features = pd.concat([user_features] * len(filtered_question_features), ignore_index=True)
    combined_features = pd.concat([combined_features, filtered_question_features.reset_index(drop=True)], axis=1).fillna(0)

    # Ensure the feature names match those used during training
    combined_features.columns = FEATURE_NAMES

    # Predict probabilities of each question being a good recommendation
    predictions = model.predict_proba(combined_features)[:, 1]  # Assuming binary classification

    # Get the indices of the top 15 questions
    top_indices = np.argsort(predictions)[-15:]

    # Randomly select one of the top 15 questions
    recommended_index = random.choice(top_indices)
    recommended_question = questions[filtered_question_features.index[recommended_index]]

    return jsonify({'recommended_question': recommended_question})

if __name__ == '__main__':
    app.run(debug=True, port=8123)
