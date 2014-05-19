#include <iostream>
#include <fstream>
#include <vector>
#include <set>
#include <sstream>

using namespace std;
void printSpaces(int num, ofstream& fout){
	for(int i = 0 ; i < num ; i++ ){
		fout<<" ";
	}
}

void parseToJSON(vector<string>& words, int current_letter, int start, int end, ofstream& fout){
	set<char> charactersSeen;
	int first_length = words[start].length();
	// fout<<"start:"<<start<<endl;
	// fout<<"end:"<<end<<endl;
	if(current_letter == first_length){
		// printSpaces(current_letter, fout);
		// fout<<"value:\"true\",";
		// fout<<"";
		start ++;
		if(start == end ){
			return;
		}
	}
	for(int i=start;i<end;i++) {
		char newChar = words[i].at(current_letter);
		if (charactersSeen.count(newChar)==0){//character is not seen
			charactersSeen.insert(newChar);
			// printSpaces(current_letter, fout);
			fout<<"{\"letter\":\""<<newChar<<"\","<<endl;
			int count = i;
			// fout<<"in"<<endl;
			while(count < end && words[count].at(current_letter) == newChar ){
				count++;
				// fout<<"count"<<endl;
			}
			if(count != i && !(count == i+1 && (current_letter+1) == words[i].length())){
				printSpaces(current_letter, fout);
				fout<<"\"children\""<<":["<<endl;
				parseToJSON(words, current_letter+1,i,count, fout);
				printSpaces(current_letter, fout);
				fout<<"],"<<endl;
			}

			// fout<<"recurse"<<endl;

			// printSpaces(current_letter, fout);
			fout<<"},"<<endl;
		}
	}

}


int main() {
	ifstream fin ("dictionary/z.txt");
	ofstream fout ("z.json");
	vector <string> words;
	string temp;

	// words.push_back("aab");
	// words.push_back("aabdefg");

	// words.push_back("aaaarrrrgggghhhh");
	// words.push_back("aaargh");
	// words.push_back("abbcdef");
	// words.push_back("abbdefg");
	// words.push_back("ncdef");
	while (fin>>temp){		
		words.push_back(temp);
	}
	fin.close();

	// char letter='a';
	// for(int i=0;(i) < (words.size());i++){
	// 	if(words[i].at(0)!=letter){
	// 		letter = words[i].at(0);
	// 		fout.close();
	// 		stringstream ss;
	// 		ss<<letter;
	// 		string location;
	// 		ss>>location;
	// 		location = location +".txt";
	// 		cout<<location<<endl;
	// 		fout.open(location.c_str()) ;
	// 	}
	// 	fout<<words[i]<<endl;
	// }

	parseToJSON(words, 0, 0, words.size()-1, fout);

	return 0;
}
