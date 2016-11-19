
class Account:
    """ A representation of a user

    === Attributes ===

    @type account_num: str
        User account number
    @type name: str
        User's name
    @type balance: float
        User account balance
    @type income: float
        User monthly income
    @type demographics: dict
        Demographics pretaining to user
        {age, gender, employment type, employment industry, income, student} #tbd
    @type purchases: dict[str : list[Purchase]]
        A dictionary storing lists of purchases by category
    """

    def __init__(self, personal_info, demographics, purchases):
        """ Initialize a user's account.

        @type personal_info: dict
            Banking information and is of the format
            {account number, name, balance, income}
        @type demographics: dict
            Demographic information and is of the format
            {age, gender, employment type, employment industry, income, student}
        @type purchases: list[Purchase]
            A list of the user's prior purchases

        @rtype: None

        """

        self.demographics = demographics
        self.account_num = personal_info['account_num']
        self.name = personal_info['name']
        self.balance = personal_info['balance']
        self.income = personal_info['income']


        #TODO : Perhaps determine all of our categories beforehand and pre-initialize an empty list
        self.purchases = {}
        for purchase in purchases:
            if purchase.category not in purchases:
                self.purchases[purchase.category] = [purchase]
            else:
                self.purchases[purchase.category].append(purchase)

    def total_spending(self):
        """ Return a dictionary of the total amount of money spent in each purchase category

        @rtype: dict[str : float]
        """

        return_dictionary = {}

        for category in self.purchases:
            return_dictionary[category] = 0

            for purchase in self.purchases[category]:
                return_dictionary[category] += purchase.amount

        return return_dictionary

    def proportional_spending(self):
        """Return a dictionary of the proportion of total income spent in each category

        NOTE : If the user's monthly income is <= 0, then the proportion of monthly spending in
        each category is set to -1.

        @rtype dict[str : float]
        """

        proportion_purchases = self.total_spending()

        for category in self.purchases:
            if self.income > 0:
                proportion_purchases[category] = proportion_purchases[category] / self.income
            else:
                self.income = -1

        return proportion_purchases






    def add_purchase(self, purchase):
        """Add a new purchase to this user's history

        @type purchase: Purchase
            The new purchase to be added
        @rtype: None
        """

        self.purchases[purchase.category].append(purchase)


class Purchase:
    """ A transaction of some sort.

    @type category: str
        The type of 'purchase' (e.g. food, transport, savings).
    @type amount: float
        The dollar amount of the payment
    """

    def __init__(self, category, amount):
        """
        @type category: str
            The type of purchase
        @type amount: float
            The dollar amount of the payment
        """

        self.category = category
        self.amount = amount


