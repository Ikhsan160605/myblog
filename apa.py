increment = 1
flag = 1
for i in range(1, 111):
    print(i, end=' ')
    if i == flag:
        print("yes!", end=' ')
        flag += increment
        increment += 1
    print()
