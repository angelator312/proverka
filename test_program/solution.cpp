//Task: trip
//Author: Evegenij Vasilev
#include <stdio.h>

short A[10000000];
long long min_sum,sum;
int i,n,m,pos_min;

int main() {

	scanf(" %d %d",&n, &m);
	while ( i<m ) {
		scanf(" %hd",A+i);
		sum += A[i];
		i++;
	}

	min_sum=sum;
	pos_min=m-1;

	while ( i<n ) {
		scanf(" %hd",A+i);
		sum += A[i] - A[i-m];
		if (sum <= min_sum) {
			min_sum=sum;
			pos_min=i;
		}
		i++;
	}

	printf("%d\n",pos_min-m+1);

	return 0;
}
/**
6 3
6 5 4 4 6 3

10 3
4 1 1 3 3 3 3 3 3 3
*/
