import json

# List of new cricketers to update difficulty level to 3
new_cricketers = [
    "Shreyas Gopal", "Rahul Tewatia", "Deepak Hooda", "Priyam Garg", "Ruturaj Gaikwad",
    "Shubham Ranjane", "Natarajan Thakur", "Akshar Patel", "Harpreet Brar", "Chetan Sakariya",
    "Arshdeep Singh", "Abhishek Sharma", "Devdutt Padikkal", "Sandeep Sharma", "Manan Vohra",
    "Venkatesh Iyer", "Kunal Pandya", "Dhruv Jurel", "Simarjeet Singh", "Rajvardhan Hangargekar",
    "Kartik Tyagi", "Jitesh Sharma", "K.S. Bharat", "Yashasvi Jaiswal", "Vikas Mishra",
    "Riyan Parag", "Anukul Roy", "Suyash Sharma", "Ravi Bishnoi", "Deepak Chahar",
    "N. S. Karthik", "Tanmay Agarwal", "Nikhil Naik", "Prayas Ray Barman", "Kamlesh Nagarkoti",
    "Shivam Mavi", "Shubham Sharma", "Hardeep Singh", "Harshal Patel", "Shivam Dubey",
    "Saurabh Tiwary", "Rahul Tripathi", "Iqbal Abdullah", "Abhinav Manohar", "Akash Deep",
    "Ashwin Hebbar", "K. L. Rahul", "Shahbaz Ahmed", "Piyush Chawla", "Ishwar Pandey",
    "Sumit Kumar", "Kuldeep Sen", "Siddharth Kaul", "Sandeep Lamichhane", "Shivam Sharma",
    "Tushar Deshpande", "Ajitesh Argal", "Rinku Singh", "Jaskaran Malhotra", "Jagadeesha Suchith",
    "Subhanshu Senapati", "Ravi Teja", "Ramkumar Ganesan", "Lalit Yadav", "Amit Mishra",
    "Amit Kumar", "Jayant Yadav", "Pravin Tambe", "Laxman Rawat", "Abhinav Mukund",
    "Vineet Sinha", "Kedar Devdhar", "Arvind Sreenivasan", "Rahul Chahar", "Anshuman Rath",
    "Harmeet Singh", "Sanjay Ramaswamy", "Akash Vasisht", "Karthik Kamat", "Harpreet Singh",
    "Udit Patel", "Tanmay Srivastava", "Arpit Vasavada", "Vishnu Solanki", "Aditya Tare",
    "Chama Milind", "Sudhakar K", "Jayant Yadav", "Shashank Singh", "Pavan Deshpande",
    "Mohammad Nawaz", "Khushdil Shah", "Jofra Archer", "Mitchell Marsh", "Mark Wood",
    "James Vince", "Dawid Malan", "Sam Billings", "Eoin Morgan", "Chris Woakes"
]

try:
    # Load the existing JSON file with difficulty levels
    with open('players_with_difficulty.json', 'r') as file:
        players = json.load(file)

    # Ensure players is a list
    if not isinstance(players, list):
        raise ValueError("The 'players_with_difficulty.json' file does not contain a list of players.")

    # Update difficulty level for new cricketers
    for player in players:
        if 'name' in player and player['name'] in new_cricketers:
            player['difficulty'] = 3

    # Save the updated JSON file
    with open('players_with_difficulty.json', 'w') as file:
        json.dump(players, file, indent=4)

    print('Updated difficulty levels for new cricketers.')

except FileNotFoundError:
    print("Error: 'players_with_difficulty.json' file not found.")
except json.JSONDecodeError:
    print("Error: Failed to decode JSON from 'players_with_difficulty.json'.")
except ValueError as ve:
    print(f"Value Error: {ve}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
