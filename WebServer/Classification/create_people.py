import numpy
from classifier import predict
import math
import generators as gen
import random
from people import Person
import generate_test_case as gc
import pymongo

'''
Order is Ed - Ent - Clth - Ele- Rest. - groc- B.eq- A.eq- S.eq- Alch- HH- Groom
'''


def to_dict(self):
    return {'category': self.category, 'username': self.username, 'password': 'a', 'gender': self.gender,
            'email': self.email, 'age': self.age, 'income': self.income, 'savings': self.savings, 'rent': self.rent,
            'utilities': self.utilities, 'transaction': self.trans_history}


def create_transaction_history(vect):
    '''
    vect is a liftstyle vector, used to determine how many transactions
    should be made of a single type, always take the ceiling.
    Amount is to be determined using the average amount vector taken
    at index [category], and then
    return a list in populated by (category (1-12), amount, name='a')
    '''
    avg_amount = [300, 25, 40, 200, 25, 40, 50, 50, 50, 20, 20, 40]
    num_transactions = numpy.random.normal(30, 10)
    a = []
    for i in range(len(vect)):
        for j in range(math.ceil(num_transactions * vect[i])):
            # Append a transaction proportional to how many should be there
            a.append({'category': i, 'amount': abs(numpy.random.normal(avg_amount[i], avg_amount[i] / 1.5)), "name": 'a'})
    return a


def determine_saving_rating():
    '''
    return a number normall distributed about 0.15 based on how
    much income that person saves.
    '''
    return numpy.random.normal(0.12, 0.2)


def determine_inv_sav(trans_history, saving_rating):
    '''
    Normal dist about avg. income
    '''
    expenditure = 0
    for i in trans_history:
        expenditure += i["amount"]
    inc_sav = (expenditure * (1 + saving_rating), expenditure * (1 + saving_rating) - expenditure)
    return inc_sav


def determine_income(transaction_history, saving_rating):
    return determine_inv_sav(transaction_history, saving_rating)[0]


def determine_savings(transaction_history, saving_rating):
    return determine_inv_sav(transaction_history, saving_rating)[1]


def determine_rent():
    return numpy.random.beta(2, 3) * 2000


def determine_utility(rent):
    return numpy.random.beta(3, 18) * rent


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
        final[j] = final[j] / total
    return final


def gen_profile(vect=None):
    '''
    Input lifestyle vector return person obj with income, expenditure,
    purchase amount by category.
    '''
    sav_rating = determine_saving_rating()
    gender = random.choice(['male', 'female'])
    username = gen.generate_name().lower()
    if not vect:
        if gender == 'male':
            vect = gc.generate_test_cases(1)[0]
        else:
            vect = gc.generate_test_cases(1)[1]
    trans_hist = create_transaction_history(vect)
    income, saving = determine_inv_sav(trans_hist, sav_rating)
    email = gen.generate_email(username)
    age = str(random.choice(list(range(16, 81))))
    rent = determine_rent()
    category = str(predict(vect))
    utilities = determine_utility(rent)
    Location = random.choice(['Toronto', 'Calgary', 'Vancover', 'Montreal', 'Edmonton'])
    password = "a"
    return Person(category, username, gender, password, email, age, income, saving, rent, utilities, trans_hist)


def generate_people(num_people):
    '''
    Generates a number of people equivalent to num_people.
    '''

    # Make sure mongoDB is started with $ mongod in cmd
    client = pymongo.MongoClient('localhost', 27017)  # you can specify the db location as an argument
    db = client['finhacks']
    collection = db['users']
    monthly_total_spend = 0
    times_spent = 0
    for i in range(0, num_people):
        temp = gen_profile()
        temp_dict = to_dict(temp)
        collection.insert_one(temp_dict)


if __name__ == "__main__":
    generate_people(500)
