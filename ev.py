# A company produces two products x and y using 2 types of resources labour and material. each unit of product x reqyures 2 hours of labour and 1 unit of material, while each unit of product, y requires 3 hours of labour and 2 unit of matterial , the company has 100 hours of labour and 80 units of material the profit earned from each unit of product x is 10 dollar and from product y is 15 dollar maximize the total profit. constrains 1) phy limied avilabiltiy of labour ( 100 hours) 2) phy limited availability of material ( 80 units).
from scipy.optimize import linprog

c = [10, 15] #profit earned from each unit 
A = [[2, 3], [1, 2]]
b = [100, 80]
bounds = [(0, None), (0, None)]

res = linprog(c, A_ub=A, b_ub=b, bounds=bounds, method='highs')

if res.success:
    print(f"Number of units of product x: {res.x[0]}")
    print(f"Number of units of product y: {res.x[1]}")
    print(f"Total profit: ${-res.fun}")
else:
    print("Optimization failed. Check constraints.")