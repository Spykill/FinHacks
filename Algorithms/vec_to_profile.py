import numpy 
import classifier
import math
import generators as gen
import random
from people import Person
import pymongo
import generate_test_case as gc

'''
Order is Ed - Ent - Clth - Ele- Rest. - groc- B.eq- A.eq- S.eq- Alch- HH- Groom
'''


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

def determine_rent():
	return numpy.random.beta(2,3)*2000

def determine_utility(rent):
	return numpy.random.beta(3,18)*rent

def proportional_expenditure(trans_history):
	total = 0
	for i in trans_history:
		total += i[1]
	final = {}
	for i in trans_history:
		if i[0] in final:
			final[i[0]] += i[1]
		else:
			final[i[0]] = i[1]
	for j in final:
		final[j] = final[j]/total
	return final
	

def gen_profile(vect=None):
	'''
	Input lifestyle vector return person obj with income, expenditure,
	purchase amount by category.
	'''
	sav_rating=determine_saving_rating()
	gender=random.choice(['male','female'])
	if not vect:
		if gender == 'male':
			vect = gc.generate_test_cases(1)[0]
		else:
			vect = gc.generate_test_cases(1)[1]
	trans_hist=create_transaction_history(vect)
	income, saving=determine_inv_sav(trans_hist, sav_rating)
	email = gen.generate_email(name)
	age = random.choice(list(range(16,81)))
	rent= determine_rent()
	category = classifier.predict(vect)
	utilities = determine_utility(rent)
	name = gen.generate_name()
	Location = random.choice(['Toronto', 'Calgary', 'Vancover', 'Montreal', 'Edmonton'])
	return Person(category,name,gender,email,age,income,saving,rent,utilities,trans_hist)


def generate_people(num_people):
	'''
	Generates a number of people equivelant to num_people.
	'''
	db = pymongo.collection.Collection(finhacks, people)
	y = [gen_profile() for i in range(0, num_people)]
	result = db.test.insert_many(y)
	result.insert_ids
	
generate_people(100)
	
