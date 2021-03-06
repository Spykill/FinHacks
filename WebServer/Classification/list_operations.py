import numpy
import sys
import math
'''
create a list of 12 floats generated by beta RVs
and then normalize that list s.t. sum(lst) == 1
'''
def generate_list(stat_vec):
	'''
	stat_vec accept a vector of tuples of means and std deviation
	means is the expected propostion of purchases of a good,
	and std deviation is based on the probabiliy of that 
	category being a hobby.
	'''
	a = []
	for param in stat_vec:
		a.append(abs(numpy.random.beta(a=param[0],b=param[1],size=None)))
	return a
	
def normalize_list(lst):
	s = sum(lst)
	for i in range(len(lst)):
		lst[i] = lst[i]/s
	return lst

a=generate_list([(1,1) for x in range(0,10)])
		

