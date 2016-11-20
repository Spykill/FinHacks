import Account, Purchase

class Person:
    """
    === Attributes ===
    @lifestyle: list
        A vector with 12 items; their sum is 1

    @type expenditures:

    """
    def __init__(self,category, username,gender,password, email, age, income, savings, rent, utilities, trans_history):
        """Initialize a new instance of a person."""
        self.category,self.username,self.gender,self.password,self.email,self.age,self.income,self.savings,self.rent,self.utilities,self.trans_history = category, username, gender,password,email,age,income,savings,rent,utilities,trans_history
