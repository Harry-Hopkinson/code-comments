'''
for i in range(1, 10):
    for j in range(1, i+1):
        print('%d*%d=%d' % (i, j, i*j), end='\t')
    print()

a, b = 0, 1
while b < 100:
    print(b, end='\t')
    a, b = b, a+b
print()
'''

print("Test")