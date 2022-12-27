#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define YES 1
#define NO 0

int can_read(int size, char* word)
{
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (word[i] == 'a' || word[i] == 'e' || word[i] == 'i' || word[i] == 'o' || word[i] == 'u')
            count = 0;
        else 
            count += 1;

        if (count >= 4)
            return NO;
    }

    return YES;
}

int main()
{
    int cases, size;
    char* word;

    scanf("%d", &cases);

    for (int c = 0; c < cases; c++)
    {
        scanf("%d", &size);

        word = (char*)malloc(size);
        scanf("%s", word);

        if (can_read(size, word))
            printf("YES\n");
        else
            printf("NO\n");

        free(word);
    }
}
