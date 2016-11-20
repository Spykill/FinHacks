import Account, Purchase

class Person:
    """
    === Attributes ===
    @lifestyle: list
        A vector with 12 items; their sum is 1

    @type expenditures:

    """

    def __init__(self,category, name,gender, email, age, income, savings, rent, utilities, trans_history):
        """Initialize a new instance of a person."""
        self.category,self.name,self.gender,self.email,self.age,self.income,self.savings,self.rent,self.utilities,self.trans_history = category, name, gender,email,age,income,savings,rent,utilities,trans_history
        
    def to_dict(self):
		return {'category': self.category, 'name': self.name, 'gender': self.gender, 'email': self.email, 'age': self.age, 'income': self.income, 'savings' :self.savings, 'rent': self.rent, 'utilities': self.utilities, 'trans_history': self.trans_history}
