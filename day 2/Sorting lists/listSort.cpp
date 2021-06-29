#include <iostream>
using namespace std;

void bubsort(int *arr, int l) // bubble sort
{
    for (int i = 0; i < l - 1; i++)
        for (int j = 0; j < l - i - 1; j++)
            if (arr[j] > arr[j + 1])
            {
                // swap arr[j+1] and arr[j]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }

    // printing
    for (int i = 0; i < l; i++)
        cout << arr[i];
}

void selsort(int *arr, int l) // selection sort
{
    // One by one move boundary of unsorted subarray
    for (int i = 0; i < l - 1; i++)
    {
        // Find the minimum element in unsorted array
        int min_idx = i;
        for (int j = i + 1; j < l; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;

        // Swap the found minimum element with the first
        // element
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }

    // printing
    for (int i = 0; i < l; i++)
        cout << arr[i];
}

void merge(int *arr, int l, int m, int r)
{
    int n1 = m - l + 1;
    int n2 = r - m;

    /* Create temp arrays */
    int L[n1];
    int R[n2];
    for (int i = 0; i < n1; ++i)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; ++j)
        R[j] = arr[m + 1 + j];

    /* Merge the temp arrays */
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
            arr[k++] = L[i++];
        else
            arr[k++] = R[j++];
    }
    while (i < n1)
        arr[k++] = L[i++];
    while (j < n2)
        arr[k++] = R[j++];
}
void mergesort(int *arr, int l, int r) // merge sort
{
    if (l < r)
    {
        // Find the middle point
        int m = (r + l) / 2;

        // Sort first and second halves
        mergesort(arr, l, m);
        mergesort(arr, m + 1, r);

        // Merge the sorted halves
        merge(arr, l, m, r);
    }
}

int main()
{
    int n;
    cout << "Enter the size of the array: ";
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++)
        cin >> arr[i];

    // UNCOMMENT THESE LINES ONE BY ONE AND OBSERVE HOW EACH TECHNIQUE WORKS:
    
    // bubsort(arr, n);
    // selsort(arr, n);
    // mergesort(arr, 0, n);
    for (int i : arr)
        cout << i << " ";
    return 0;
}