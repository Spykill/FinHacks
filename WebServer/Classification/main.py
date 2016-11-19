import sys
import json
import classifier

v = sys.argv[1]#'"[{"v":0},{"v":1},{"v":0},{"v":0},{"v":0},{"v":0},{"v":0},{"v":0},{"v":0},{"v":0},{"v":0},{"v":0}]"'#sys.argv[1]
data = v[1:-1]
data = data.replace('\\"', '"')

try:
    parsed_json = json.loads(data)
    lst = [parsed_json[0]["v"], parsed_json[1]["v"], parsed_json[2]["v"], parsed_json[3]["v"],
       parsed_json[4]["v"], parsed_json[5]["v"], parsed_json[6]["v"], parsed_json[7]["v"],
       parsed_json[8]["v"], parsed_json[9]["v"], parsed_json[10]["v"], parsed_json[11]["v"]]
    classifier.predict(toPredict=lst)
except Exception as err:
    print("ERROR!")

sys.stdout.flush()

'''
import sys
print(sys.argv[1])
sys.stdout.flush()
'''
