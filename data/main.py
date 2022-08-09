import json
from analysis import *
from data import get_data, get_data_filename
from redis_db import redis_search, test_redis
from utils import *
import pandas as pd
import sys


def main(allyears):
    print("Checking for local redis...")
    test_redis()

    years_to_analyze = years if allyears else [years[-1]]

    print("Splitting Nondomestic data into yearly csvs...")
    # for dataset in datasets:
    #     df = pd.read_csv(
    #         f"./csv/NonDomesticVAERS{dataset}.csv", encoding="latin1", engine="python"
    #     )
    #     for year in years_to_analyze:
    #         print(f"Generating {get_data_filename(year, dataset, True)}.csv...")
    #         if dataset == "DATA":
    #             year_df = df[df["RECVDATE"].str.contains(year)]
    #         else:
    #             data_df = get_data(year, "DATA", True)
    #             vaers_ids = data_df["VAERS_ID"].to_list()
    #             year_df = df[df["VAERS_ID"].isin(vaers_ids)].drop_duplicates(
    #                 subset=["VAERS_ID"], keep="first"
    #             )
    #         year_df.to_csv(
    #             f"./csv/{get_data_filename(year, dataset, True)}.csv",
    #             encoding="latin1",
    #             index=False,
    #         )

    print("Reading datasets...")
    # for dataset in datasets:
    #     for year in years_to_analyze:
    #         print(f"Loading {get_data_filename(year, dataset, True)}.csv...")
    #         get_data(year, dataset, True)
    #         print(f"Loading {get_data_filename(year, dataset, False)}.csv...")
    #         get_data(year, dataset)

    print("Calculating analysis...")
    analysis = {}
    for year in years_to_analyze:
        year_analysis = {}
        analysis_keys = analysis_year_keys_and_analysis(year)
        keys = analysis_keys.keys()
        for key in keys:
          value = redis_search(analysis_keys[key]["key"], analysis_keys[key]["analysis"], *analysis_keys[key]["args"], delete=True, log=True)
          year_analysis[key] = value
        analysis[year] = year_analysis

    print("Saving analysis to data.json")
    with open("data.json", "w") as file:
        file.write(json.dumps(analysis))


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) == 0:
        main(False)
    elif args[0] == "-allyears":
        main(True)
    else:
        print("Error, invalid command.")
