def find_mode(data: str):
    words = map(lambda word : word if word[-1].isalpha() else word[:-1], data.split(' '))
    table = {}

    for word in words:
        if table.get(word) is None:
            table[word] = 1
        else:
            table[word] += 1

    # convert the hash table into list of (key, value) pairs
    # sort the list based on the second element in list
    # sort is reversed to get the biggest element at index 0

    words = list(table.items())
    words.sort(reverse=True, key=lambda word: word[1])
    return words[0][0]

def find_words(data: str, count: int):
    words = data.split(' ')

    # map() removes any punctuation
    # filter() removes words which are not atleast `count` characters long
    # set() removes duplicates

    return set(
            filter(
                lambda word : len(word) >= count,
                map(lambda word : word if word[-1].isalpha() else word[:-1], words)
            ))

if __name__ == '__main__':
    with open('input_files/about.txt', 'r') as input_file:
        data = input_file.readline()
        
    words = find_words(data, 6)
    mode = find_mode(data)

    print("The words with atleast 6 letters are,", '\n'.join(words), sep='\n')
    print(f"The most frequently used word is '{mode}'")