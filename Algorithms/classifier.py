import generate_test_case as gc
import numpy as np
from sklearn import mixture
a=gc.generate_test_cases(300)
a=np.asarray(a)
c=mixture.GaussianMixture(n_components=15)
c.fit(a)
b = [0.1,0.1,0.1,0.1,0.1,0.1,0.05,0.05,0.05,0.05,0.1,0.1]
