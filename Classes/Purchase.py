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


