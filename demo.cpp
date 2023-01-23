#include<bits/stdc++.h>
using namespace std;
int n = 4, m = 4, tile = 1, i = n-1, j = m-1;
vector<vector<int>> a(n,vector<int>(m));
void randOrdered();
void starPrint(int length, char c = '*'){
    for(int i=0;i<length;i++){
        cout<<c;
    }
    cout<<endl;
}
bool winningCondition(){
    int i, j, k = 1;
    if(a[n-1][m-1] != n*m)
        return 0;
    for(i=0;i<n;i++){
        for(j=0;j<m;j++){
            if(a[i][j] != k)
                break;
            k++;
        }
        if(j<m)
            break;
    }
    if(j<m)
        return 0;
    return 1;
}
bool lowerTileMovesUp(){
    if(i==n-1){
        cout<<"Shifting is Not Possible"<<endl;
        return 0;
    }
        swap(a[i][j],a[i+1][j]);
        i = i+1;
        return 1;
}
bool leftTileMovesRight(){
    if(j==0){
        cout<<"Shifting is Not Possible"<<endl;
        return 0;
    }
        swap(a[i][j],a[i][j-1]);
        j = j-1;
        return 1;
}
bool upperTileMovesDown(){
    if(i==0){
        cout<<"Shifting is Not Possible"<<endl;
        return 0;
    }
        swap(a[i][j],a[i-1][j]);
        i = i-1;
        return 1;
}
bool rightTileMovesLeft(){
    if(j==m-1){
        cout<<"Shifting is Not Possible"<<endl;
        return 0;
    }
        swap(a[i][j],a[i][j+1]);
        j = j+1;
        return 1;
}
void display(){
    starPrint(5*m+6);
    for(int i=0;i<n;i++){
        cout<<"|";
        for(int j=0;j<m;j++){
            if(a[i][j] != n*m){
                cout<<setw(5)<<a[i][j];
            }
            else{
                cout<<setw(5)<<" ";
            }
        }
        cout<<setw(5)<<" |";
        cout<<endl;
    }
    starPrint(5*m+6);
}
void instruction(){
    starPrint(18);
    cout<<"RULE OF THIS GAME\n";
    starPrint(18);
    cout<<"\n1. You can Move Only 1 Step at a Time by Pressing Following Key ";
    cout<<"\nMove Up   : By Pressing W Key";
    cout<<"\nMove Down : By Pressing S Key";
    cout<<"\nMove Left : By Pressing A Key";
    cout<<"\nMove Right: By Pressing D Key";
    cout<<"\n";
    cout<<"\n2. You can Move Number at Empty Position Only ";
    cout<<"\n";
    // cout<<"\n3.For each valid move : your total number of move will decreased by 1 \n";
    // cout<<"4.Wining situation : ";
    // cout<<"number in a 4*4 matrix should be in order from 1 to 15 ";
    // cout<<"\n\n            winning situation:         \n";
   
    starPrint(26);
    int arr[4][4] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16};
    for(int i=0;i<4;i++){ 
        cout<<"|";
        for(int j=0;j<4;j++){   
            if(arr[i][j]!=16)
            cout<<setw(5)<<arr[i][j];
            else
            cout<<setw(5)<<" ";
        }
        cout<<setw(5)<<"|";
        cout<<"\n";
    }
    starPrint(26);
    cout<<"\n3. You Can Exit the Game at Any Time by Pressing 'N' or 'n' ";
   
   
    // cout<<"\nSo Try to win in minimum no of move \n";
    cout<<"\n         Happy gaming , Good Luck\n";

}
int game(){
    char c;
    randOrdered();
    while(1){
        bool b = 0; 
        while(!b){
            cout<<"Press...\nW for Up\nA for Left\nS for Down\nD for Right\n";
            cout<<"If You Want to Exit. Press N"<<endl<<endl;
            cin>>c;
            if(c == 'n' || c == 'N'){
                return -1;
            }
            // b = winningCondition();
            system("cls");
            switch(c){
                case 'w':
                case 'W':
                    if(lowerTileMovesUp());
                    break;
                case 'd':
                case 'D':
                    if(leftTileMovesRight());
                    break;
                case 's':
                case 'S':
                    if(upperTileMovesDown());
                    break;
                case 'a':
                case 'A':
                    if(rightTileMovesLeft());
                    break;
                default:
                    cout<<"Wrong Input Try Again"<<endl;
            }
            // cout<<"Temp Successful entry"<<endl;
            display();
            b = winningCondition();
        }
        if(b == 1){
            return 1;
        }
        else{
            return 0;
        }
    }
}
void randOrdered(){
    int length = n*m-1, num[length], lastIndex = length - 1;
    for(int i=0;i<length;i++){
        num[i] = i+1;
    }
    srand(time(0));
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(lastIndex>=0){
            int index = rand()%(lastIndex+1);
            a[i][j] = num[index];
            num[index] = num[lastIndex--];
            }
        }
    }
    display();
}
int main(){
    instruction();
    string name = "";
    cout<<endl<<"Enter Your First Name"<<endl;
    cin>>name;
    cout<<"Hi "<<name<<endl;
    starPrint(name.length()+3,'-');
    cout<<"Press Any Key to Enter the Game"<<endl<<"Press N to exit the game"<<endl;
    char c;
    cin>>c;
    if(c == 'n' || c == 'N'){
        starPrint(26);
        cout<<"Thankyou "<<name<<" "<<endl;
        starPrint(26);
        return 0;
        getchar();
    }
    while(1){
        cout<<"Enter Number of Row and Column"<<endl;
        cin>>n>>m;
        i = n - 1;
        j = m - 1;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                a[i][j] = tile++;
            }
        }
        int win = game();
        if(win == 1){
            starPrint(5);
            cout<<"Congrats... "<<name<<" You Won the Game"<<endl;
            starPrint(5);
        }
        else if(win == -1){
            break;
        }
        else{
            cout<<"You loose the Game"<<endl;
        }
        cout<<"Want to Play Again ?\nPress Any Key\nElse N"<<endl;
        cin>>c;
        if(c == 'n' || c == 'N')
            break;
    }
    cout<<"Thanks for Playing. "<<name<<" Visit Again"<<endl;
    //Write from here
    getchar();
    return 0;
}