import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load questions and user interactions from CSV files
questions_df = pd.read_csv('questions.csv')
interactions_df = pd.read_csv('user_interactions.csv')

# Preprocess the questions data
VALID_CATEGORIES = ['Biology', 'History', 'Culture', 'Travel', 'Art', 'Science', 'Geography']
VALID_DIFFICULTIES = ['easy', 'medium', 'hard']

questions_df['category'] = questions_df['category'].apply(lambda x: VALID_CATEGORIES.index(x))
questions_df['difficulty'] = questions_df['difficulty'].apply(lambda x: VALID_DIFFICULTIES.index(x))

# Merge questions with interactions on question_id
questions_df.set_index('id', inplace=True)
interactions_df.set_index('question_id', inplace=True)
df = questions_df.join(interactions_df, how='inner')

# Fill missing values in interaction features with 0 and convert to int
df['answered'] = df['answered'].fillna(0).astype(int)
df['liked'] = df['liked'].fillna(0).astype(int)

# Define the target variable and features
X = df[['difficulty', 'category', 'like', 'answered', 'liked']]
y = df['answered'] & df['liked']  # Target: both answered correctly and liked

# Ensure no NaN values in X
X = X.fillna(0)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'random_forest_model.pkl')
