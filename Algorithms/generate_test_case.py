import scipy
import numpy as np
import list_operations as lo
'''
Ed - Ent - Clth - Ele- Rest. - groc-B.eq-A.eq-S.eq-Alch-HH-Groom
'''
vec_m = [(1.7,30),(1.5,2.5),(4.3,30),(2.6,18),(1.9,3.7),(3,40),(1.7,35),(2,40),(1.25,10),(2.5,13),(2,40),(1.1,50)]
vec_f = [(1.85,30),(1.5,2.5),(4.1,30),(1.9,18),(1.9,3.7),(5.4,40),(1.2,35),(1.8,40),(1.05,10),(2.5,13),(2.3,40),(2,50)]
def generate_test_cases(n):
	'''
	Return 2n training lists modelled off of vec_m and vec_f equally.
	'''
	a=[]
	for i in range(0,n):
		a.append(lo.normalize_list(lo.generate_list(vec_m)))
		a.append(lo.normalize_list(lo.generate_list(vec_f)))
	return a
	
	
