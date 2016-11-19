import sys
import json

data = sys.argv[1][1:-1]
data = data.replace('\\"', '"')

parsed_json = json.loads(data)

print(0)

sys.stdout.flush()

'''
import sys
print(sys.argv[1])
sys.stdout.flush()
'''