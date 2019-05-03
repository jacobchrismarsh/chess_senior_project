import sys
from os.path import dirname, join, abspath

# This line modifies the __file__ attribute and allows us to import the `compiler`
# directly without any weirdness
sys.path.append(abspath(join(dirname(__file__), "../../../../")))
import pychess
