def fill_missing(table: list[list[str]]):
    m, n = len(table), len(table[0])
    missing_words = ('NA', 'None', 'Nan', 'Nil', '-')

    for j in range(n):
        counter = {}
        datatype = 'int' if table[0][j].isdigit() else 'str'

        # constructing the dictionary
        for i in range(m):
            if table[i][j] not in missing_words:
                if counter.get(table[i][j]) is None:
                    counter[table[i][j]] = 1;
                else:
                    counter[table[i][j]] += 1;
        
        # filling the missing values using counter
        for i in range(m):
            if table[i][j] in missing_words:

                if datatype == 'int':
                    # if the datatype of the column is `int`
                    # we calculate the average and substitute the value such that

                    sum = 0;
                    for [k,v] in counter.items():
                        sum += int(k) * v
                    table[i][j] = str(sum // n)

                elif datatype == 'str':
                    # if the datatype of the column is `str`
                    # we find the most common string and substitute it

                    mode = ['', 0]
                    for [k,v] in counter.items():
                        if mode[1] < v:
                            mode = [k,v]
                    table[i][j] = mode[0]

    return table

if __name__ == '__main__':
    with open('input_files/dataset.csv', 'r') as input_file:
        table = input_file.readlines()

    table = list(map(lambda s : s[:-1].split(','), table))

    with open('output_files/dataset-output.csv', 'w') as output_file:
        # writing the header
        output_file.write(','.join(table[0]) + '\n')

        # writing the new records with missing values substituted
        output_file.writelines(map(lambda l: ','.join(l) + '\n', fill_missing(table[1:])))
