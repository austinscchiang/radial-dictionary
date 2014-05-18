#include <iostream>
#include <fstream>
#include <vector>
#include <set>
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
		fout<<"value:\"true\",";
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
			fout<<newChar<<":{";
			int count = i;
			// fout<<"in"<<endl;
			while(count < end && words[count].at(current_letter) == newChar ){
				count++;
				// fout<<"count"<<endl;
			}
			// count--;

			// fout<<"recurse"<<endl;
			parseToJSON(words, current_letter+1,i,count, fout);

			// printSpaces(current_letter, fout);
			fout<<"},";
		}
	}

}


int main() {
	ifstream fin ("words.txt");
	ofstream fout ("parsed.txt");
	vector <string> words;
	string temp;

	// words.push_back("aab");
	// words.push_back("aabdefg");

	// words.push_back("aaaarrrrgggghhhh");
	// words.push_back("aaargh");
	// words.push_back("abbcdef");
	// words.push_back("abbdefg");
	// words.push_back("acafjeh");
	while (fin>>temp){		
		words.push_back(temp);
	}
	fin.close();


	// for(int i=0;i<words.size();i++){
	// 	fout<<words[i]<<endl;
	// }

	parseToJSON(words, 0, 0, words.size()-1, fout);

	return 0;
}
