//Task: trip
//Author: Evegenij Vasilev
#include <stdio.h>

short A[10000000];
long long min_sum=10000000001,sum;
int i,j,n,m,pos_min;

int main() {

	scanf(" %d %d",&n, &m);
	while ( i<n ) {
		scanf(" %hd",A+i);
		i++;
	}

	while ( i>=m ) {
		sum=0;
		j=i-m;
		while ( j<i ) {
			sum += A[j];
			j++;
		}
		if (sum < min_sum) {
			min_sum=sum;
			pos_min=i;
		}
		i--;
	}

	printf("%d\n",pos_min-m);
	return 0;
}
/**
6 3
6 5 4 4 6 3

10 2
1 3 1 3 3 3 3 3 3 3
*/
