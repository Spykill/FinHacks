import generate_test_case as gc
import numpy as np
from sklearn import mixture
from sklearn.externals import joblib
import pickle
'''
a=gc.generate_test_cases(20)
a=np.asarray(a)
c=mixture.GaussianMixture(n_components=15)
c.fit([a])
'''

def train(n):
	training_data = gc.generate_test_cases(n)
	training_data = np.asarray(training_data)
	clusterer = mixture.GaussianMixture(n_components=15)
	clusterer.fit(training_data)
	joblib.dump(clusterer, "training_data.pkl")
	predict()

def predict(toPredict=None):
	"""
	Predicting a vector of dimensions 12 to output a value from 0 to 15.
	@param toPredict: vector of dimensions 12
	"""
	if not toPredict:
		toPredict = gc.generate_test_cases(1)[0]
	toPredict = np.asarray(toPredict)
	toPredict = toPredict.reshape(1, -1)	
	clusterer = joblib.load("training_data.pkl")
	class_ = clusterer.predict(toPredict)
	print(class_[0])

