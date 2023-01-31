#include<bits/stdc++.h>
using namespace std;
int n = 100, m = 100, i = n-1, j = m-1;
long int counts = 0;
vector<vector<int>> a(n,vector<int>(m));
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
void instruction(){
    starPrint(18);
    cout<<"RULE OF THIS GAME\n";
    starPrint(18);
    cout<<"1. You can Move Only 1 Step at a Time by Pressing Following Key.\n";
    cout<<"Move Up   : By Pressing W Key.\n";
    cout<<"Move Down : By Pressing S Key.\n";
    cout<<"Move Left : By Pressing A Key.\n";
    cout<<"Move Right: By Pressing D Key.\n";
    cout<<"2. You can Move Number at Empty Position Only.\n\n";
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
    cout<<"\n3. You Can Exit the Game at Any Time by Pressing 'N' or 'n'. \n";
   cout<<"4. Note You can Take Row Size and Column Size Greater Than and Equal to 2.\n";
   
    // cout<<"\nSo Try to win in minimum no of move \n";
    cout<<"         Happy gaming , Good Luck.\n";

}
int game(){
    char c;
    system("CLS");
    randOrdered();
    while(1){
        bool b = 0; 
        while(!b){
            cout<<"Press...         "<<"No. of Steps Played : "<<counts<<"\nW for Up\nA for Left\nS for Down\nD for Right\n";
            cout<<"If You Want to Exit, Press N."<<endl<<endl;
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
                    counts++;
                    break;
                case 'd':
                case 'D':
                    if(leftTileMovesRight());
                    counts++;
                    break;
                case 's':
                case 'S':
                    if(upperTileMovesDown());
                    counts++;
                    break;
                case 'a':
                case 'A':
                    if(rightTileMovesLeft());
                    counts++;
                    break;
                default:
                    cout<<"Wrong Input Try Again."<<endl;
            }
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
int main(){
    instruction();
    string name = "";
    cout<<endl<<"Enter Your First Name."<<endl;
    cin>>name;
    cout<<"Hi "<<name<<","<<endl;
    starPrint(name.length()+4,'-');
    cout<<"Press Any Key to Enter the Game."<<endl<<"Press N to exit the Game."<<endl;
    char c;
    cin>>c;
    if(c == 'n' || c == 'N'){
        starPrint(26);
        cout<<"Thankyou "<<name<<" "<<". You Chose to Exit the Game."<<endl;
        starPrint(26);
        return 0;
        getchar();
    }
    while(1){
        cout<<"Enter Number of Row and Column."<<endl;
        cin>>n>>m;
        while((n < 3 || m < 3)){
            if(n == 2 && m >= 3 || n == 3 && m >= 2)
                break;
            cout<<"You have Entered Wrong Dimensions.\nTry Again."<<endl;
            cin>>n>>m;
        }
        i = n - 1;
        j = m - 1;
        a[i][j] = n*m;
        int win = game();
        if(win == 1){
            cout<<endl;
            starPrint(name.length()+40,'-');
            cout<<"Congrats... "<<name<<" You Won the Game in "<<counts<<" steps."<<endl;
            starPrint(name.length()+40,'-');
            cout<<endl;
        }
        else if(win == -1){
            break;
        }
        else{
            cout<<"You Lose the Game."<<endl;
        }
        cout<<"Want to Play Again ?\nPress Any Key to Again Start the Game.\nElse Press N to Exit the Game."<<endl;
        cin>>c;
        if(c == 'n' || c == 'N')
            break;
        counts = 0;
    }
    cout<<"Thanks for Playing. "<<name<<" Visit Again"<<endl;
    getchar();
    return 0;
}