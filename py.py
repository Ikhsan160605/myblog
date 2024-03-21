flag = 1
yes_numbers = []
while True:
    num = input("masukin angka yang ingin ada yes!. klo udh ketik selesai: ")
    if num.lower() == 'selesai':
        break
    try:
        num = int(num)
        yes_numbers.append(num)
    except ValueError:
        print("masukin angka yang ingin ada yes!. klo udh ketik selesai: ")
        
for i in range(1, 11):
    print(i, end=' ')
    if i in yes_numbers:
        print("yes!", end=' ')
    print()
