
from random import randint

VOWELS = ['a', 'e', 'i', 'o', 'u']
CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

CONNECTORS = ['-', '.', '']
EMAIL_DOMAINS = ['yahoo.com', 'gmail.com', 'outlook.com', 'hotmail.com']

def generate_name():
    """Randomly generate a name
    The first name is of the format C-V-C-V-C
    The last name is of the format V1-V1-C-V2-V2

    @rtype: (str, str)
        A first and last name
    """

    first_name = ""

    for letter in range(5):
        if letter % 2 == 0:
            first_name += CONSONANTS[randint(0, 20)]
        else:  # The letter is even
            first_name += VOWELS[randint(0, 4)]

    last_name = ""
    for letter in range(5):
        if letter == 1 or letter == 3:
            last_name += CONSONANTS[randint(0, 20)]
        elif letter == 4:
            last_name += VOWELS[randint(0, 4)]
        else:
            last_name += VOWELS[randint(0, 4)] * 2

    last_name = last_name[0].upper() + last_name[1:]
    first_name = first_name[0].upper() + first_name[1:]

    return (first_name, last_name)


def generate_email(name):
    """Generate an email address given a name
    @type name: (str, str)
        The person's name
    @rtype: str
        The generated email address
    """

    email = ''
    email += (name[0] + CONNECTORS[randint(0, 2)] + name[1])

    for nums in range(randint(0, 3)):
        email += str(randint(0, 9))

    email += '@{}'.format(EMAIL_DOMAINS[randint(0, 3)])

    if 0 == randint(0,1):
        email = email[0].upper() + email[1:]

    return email

if __name__ == "__main__":
    print(generate_email(generate_name()))
