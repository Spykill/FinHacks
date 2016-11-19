import numpy 
import classifier
import math
'''
Order is Ed - Ent - Clth - Ele- Rest. - groc- B.eq- A.eq- S.eq- Alch- HH- Groom
'''
def gen_profile(vect):
	'''
	Input lifestyle vector return person obj with income, expenditure,
	purchase amount by category.
	'''
	return ()

def create_transaction_history(vect):
	'''
	vect is a liftstyle vector, used to determine how many transactions
	should be made of a single type, always take the ceiling.
	Amount is to be determined using the average amount vector taken
	at index [category], and then 
	return a list in populated by (category (1-12), amount, name='a') 
	'''
	avg_amount = [300,25,40,200, 25,40, 50, 50, 50, 20, 20, 40]
	num_transactions = numpy.random.normal(30,10)
	a = []
	for i in range(len(vect)):
		for j in range(math.ceil(num_transactions*vect[i])):
			# Append a transaction proportional to how many should be there
			a.append((i, abs(numpy.random.normal(avg_amount[i], avg_amount[i]/1.5)), 'a'))
	return a
	
def determine_saving_rating():
	'''
	return a number normall distributed about 0.15 based on how
	much income that person saves.
	'''
	return numpy.random.normal(0.12,0.2)

def determine_inv_sav(trans_history, saving_rating):
	'''
	Normal dist about avg. income
	'''
	expenditure = 0 
	for i in trans_history:
		expenditure += i[1]
	inc_sav = (expenditure*(1+saving_rating), expenditure*(1+saving_rating) - expenditure)
	return inc_sav
	
def determine_income(transaction_history, saving_rating):
	return determine_inv_sav(transaction_history, saving_rating)[0]
	
def determine_savings(transaction_history, saving_rating):
	return determine_inv_sav(transaction_history, saving_rating)[1]

def determine_categoric_expendicture(monthly_spending, lifestyle_vector,weighing_vector):
	'''
	Order of categories:
	Rent-groceries-transportation-restaurants-entertainment-education-clothing-electronics-utilities
	
	Order of 
	'''

def Location():
	pass
	
def Name():
	pass
	
def email():
	pass
