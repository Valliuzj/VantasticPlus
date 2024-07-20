import joblib
from sklearn.tree import export_graphviz
import graphviz

model = joblib.load('random_forest_model.pkl')

tree = model.estimators_[0]

export_graphviz(tree, out_file='tree.dot', 
                feature_names=['difficulty', 'category', 'like', 'answered', 'liked'],
                class_names=['0', '1'],
                rounded=True, proportion=False, 
                precision=2, filled=True)

with open("tree.dot") as f:
    dot_graph = f.read()
graph = graphviz.Source(dot_graph) 

# generate the graph
graph.view()