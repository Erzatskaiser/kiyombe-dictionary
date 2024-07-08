# Import statements
from flask import Flask, jsonify
from flask_cors import CORS
from unidecode import unidecode
import pandas as pd
import random
import time
import csv


# Sanitization function
def sanitize_input(input_string):
    """(str) --> (str)
    Sanitizes input obtained from users
    """
    input_string = input_string.lower().strip()
    clean_string_array = []

    # Ensure the string contains only alphabetic characters
    if not input_string.isalpha():
        for char in input_string:
            if char.isalpha():
                clean_string_array.append(char)
            else:
                clean_string_array.append("")

        # Creat new string
        clean_string = ""
        for char in clean_string_array:
            clean_string += char

    else:
        clean_string = input_string

    return clean_string


# Search through the dictionary
def binary_search_dict(word_str):
    """(str) --> (str,str,str,str,str) / (int)
    Searches for word in CSV file using the binary search algorithm
    """

    # Load the CSV file
    csvFile = pd.read_csv("./files/words.csv")

    # Set the beginning and endpoints for the search
    begin_int = 0
    end_int = len(csvFile)

    # Loop implementing binary search
    while begin_int <= end_int:

        # Compute the midpoint
        midpoint_int = begin_int + ((end_int - begin_int) // 2)

        # Word at midpoint
        word_mid_str = csvFile.iloc[midpoint_int]["Noun"]

        # Word at midpoint is a match
        if word_str == word_mid_str.lower():
            synonym_str = csvFile.iloc[midpoint_int]["Synonym"]
            definition_str = csvFile.iloc[midpoint_int]["Definition"]
            example1_str = csvFile.iloc[midpoint_int]["Example 1"]
            example2_str = csvFile.iloc[midpoint_int]["Example 2"]
            example3_str = csvFile.iloc[midpoint_int]["Example 3"]
            print(definition_str)
            return [
                word_str,
                synonym_str,
                definition_str,
                example1_str,
                example2_str,
                example3_str,
            ]

        # Word is "greater" than midpoint
        elif unidecode(word_str.lower()) > unidecode(word_mid_str.lower()):
            begin_int = midpoint_int + 1

        # Word is less than midpoint
        else:
            end_int = midpoint_int - 1

    return None


# Sort the CSV file
def sort_dict():
    """(none) --> (none)
    Sorts the CSV file
    """

    # Load and sort CSV file
    csvFile = pd.read_csv("./files/words.csv")
    csvFile.sort_values(["Noun"], axis=0, ascending=[True], inplace=True)
    csvFile.to_csv()

    return 0


app = Flask(__name__)
CORS(app)


# Main route:
# Returns website name + current UTC time
@app.route("/")
def main_route():
    """(none) --> JSON
    Takes no input, and returns boilerplate information to the user
    """
    res = {"name": "Kiyom.be", "time": time.time()}
    return jsonify(res)


# Search word route:
# Search given a whole word
@app.route("/find/<word>")
def search_for_word(word):
    """(string) --> JSON
    Takes a word string as input and returns word and associated details
    """

    # Sanitize user input
    word = sanitize_input(word)

    # Search through file using binary search
    result = binary_search_dict(word)

    # Return output
    if result == None:
        res = {"noun": "Not found"}

    else:
        res = {
            "noun": str(result[0]).capitalize(),
            "synonym": str(result[1]),
            "definition": str(result[2]),
            "example1": str(result[3]),
            "example2": str(result[4]),
            "example3": str(result[5]),
        }
    return jsonify(res)


# Select random word route:
# Generate a random word on request
@app.route("/random")
def random_word():
    """(none) --> JSON
    Generates a random word for the user to consume
    """

    # Load the CSV file
    csvFile = pd.read_csv("./files/words.csv")

    # Select a random word
    index_int = random.randint(0, len(csvFile) - 1)
    word_df = csvFile.iloc[index_int]

    # Return output
    res = {
        "noun": word_df["Noun"],
        "synonym": word_df["Synonym"],
        "definition": word_df["Definition"],
        "example1": word_df["Example 1"],
        "example2": word_df["Example 2"],
        "example3": word_df["Example 3"],
    }
    return jsonify(res)


# Stream matching route:
@app.route("/rfind/<word>")
def find_recommendation(word):
    """(str) --> JSON
    List all words that match closely
    """

    # Load CSV
    csvFile = pd.read_csv("./files/words.csv")

    # Iterate over all rows
    def row_iterator():
        for i, j in csvFile.iterrows():
            if unidecode(word.lower()) == unidecode(j["Noun"][0 : len(word)].lower()):
                yield j["Noun"] + " "

    return row_iterator(), {"Content-Type": "application/json"}


# Search letter route:
@app.route("/lfind/<letter>")
def find_word_letterl(letter):
    """(str) --> JSON
    List all words that start with a given letter
    """

    # If there is more than 1 char in input
    if len(letter.strip()):
        letter = letter[0]

    # Load CSV
    csvFile = pd.read_csv("./files/words.csv")

    # Iterate over all rows
    def row_iterator():
        for i, j in csvFile.iterrows():
            if letter == j["Noun"][0].lower():
                yield j["Noun"] + " "

    # Stream response
    return row_iterator(), {"Content-Type": "application/json"}
