def process_data(data: str):
    records = []

    tmp = '' 
    i = 0

    while i < len(data):
        record = []

        while data[i].isdigit():
            tmp = tmp + data[i]
            i = i + 1

        record.append(tmp)
        tmp = ''

        while data[i].isalpha():
            tmp = tmp + data[i]
            i = i + 1

        record.append(tmp)
        tmp = ''

        while data[i].isdigit() or data[i] == '.':
            tmp = tmp + data[i]
            i = i + 1

        record.append(tmp)
        tmp = ''

        while i < len(data) and data[i].isalpha():
            tmp = tmp + data[i]
            i = i + 1

        record.append(tmp)
        tmp = ''

        records.append(record.copy())
        record.clear()
    
    return records

if __name__ == '__main__':
    with open('input_files/onelinefile.txt', 'r') as input_file:
        data = input_file.readline()

    records = process_data(data)

    with open('output_files/Filename2.csv', 'w') as output_file:
        for rec in records:
            output_file.write(','.join(rec) + '\n')