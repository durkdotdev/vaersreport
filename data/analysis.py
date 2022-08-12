from data import get_data
from redis_db import redis_get
from utils import *


def analysis_year_keys_and_analysis(year):
    return {
        "totals": {"analysis": analyze_totals, "args": [year], "key": f"{year}:totals"},
        "totals_monthly": {
            "analysis": analyze_totals_monthly,
            "args": [year],
            "key": f"{year}:totals:monthly",
        },
        "growth": {"analysis": analyze_growth, "args": [year], "key": f"{year}:growth"},
        "outcomes": {
            "analysis": analyze_outcomes,
            "args": [year],
            "key": f"{year}:outcomes",
        },
        "vaccines": {
            "analysis": analyze_vaccines,
            "args": [year],
            "key": f"{year}:vaccines",
        },
        "sexes": {
            "analysis": analyze_sexes,
            "args": [year],
            "key": f"{year}:sexes",
        },
        "ages": {"analysis": analyze_ages, "args": [year], "key": f"{year}:ages"},
    }


# Totals
def analyze_totals(year):
    d_df = get_data(year, "DATA")
    nd_df = get_data(year, "DATA", True)
    d_total = len(d_df)
    nd_total = len(nd_df)
    total = d_total + nd_total
    return {
        "abbreviation": f"'{year[-2:]}",
        "year": year,
        "d_total": d_total,
        "nd_total": nd_total,
        "total": total,
    }


def analyze_totals_monthly(year):
    d_df = get_data(year, "DATA")
    nd_df = get_data(year, "DATA", True)
    highest_monthly_total = {"total": 0}
    totals = []
    for index, month in enumerate(months):
        d_total = len(
            d_df[
                d_df["RECVDATE"]
                .str[:2]
                .eq(str(index + 1) if index + 1 > 9 else f"0{str(index + 1)}")
            ]
        )
        nd_total = len(
            nd_df[
                nd_df["RECVDATE"]
                .str[:2]
                .eq(str(index + 1) if index + 1 > 9 else f"0{str(index + 1)}")
            ]
        )
        total = d_total + nd_total
        monthly_totals = {
            **month,
            "d_total": d_total,
            "nd_total": nd_total,
            "total": total,
        }
        if monthly_totals["total"] > highest_monthly_total["total"]:
            highest_monthly_total = monthly_totals
        totals.append(monthly_totals)
    return {"highest_monthly_total": highest_monthly_total, "totals": totals}


# Growths
def analyze_growth(year):
    index = years.index(year)
    d_growth = 0
    nd_growth = 0
    total_growth = 0
    if index != 0:
        past_total = redis_get(
            analysis_year_keys_and_analysis(years[index - 1])["totals"]["key"]
        )
        present_total = redis_get(
            analysis_year_keys_and_analysis(years[index])["totals"]["key"]
        )
        d_growth = 100 * (
            (present_total["d_total"] - past_total["d_total"]) / past_total["d_total"]
        )
        nd_growth = 100 * (
            (present_total["nd_total"] - past_total["nd_total"])
            / past_total["nd_total"]
        )
        total_growth = 100 * (
            (present_total["total"] - past_total["total"]) / past_total["total"]
        )
    return {
        "abbreviation": f"'{year[-2:]}",
        "year": year,
        "d_growth": d_growth,
        "nd_growth": nd_growth,
        "total_growth": total_growth,
    }


def analyze_sexes(year):
    d_df = get_data(year, "DATA")
    nd_df = get_data(year, "DATA", True)
    d_female = len(d_df[d_df["SEX"].eq("F")])
    nd_female = len(nd_df[nd_df["SEX"].eq("F")])
    total_female = d_female + nd_female
    d_male = len(d_df[d_df["SEX"].eq("M")])
    nd_male = len(nd_df[nd_df["SEX"].eq("M")])
    total_male = d_male + nd_male
    d_unknown = len(d_df) - d_female - d_male
    nd_unknown = len(nd_df) - nd_female - nd_male
    total_unkown = d_unknown + nd_unknown
    return {
        "d_female": d_female,
        "nd_female": nd_female,
        "total_female": total_female,
        "d_male": d_male,
        "nd_male": nd_male,
        "total_male": total_male,
        "d_unknown": d_unknown,
        "nd_unknown": nd_unknown,
        "total_unkown": total_unkown,
    }


def analyze_ages(year):
    d_df = get_data(year, "DATA")
    nd_df = get_data(year, "DATA", True)
    d_0_5 = len(d_df[d_df["AGE_YRS"].lt(5) | d_df["CAGE_YR"].lt(5)])
    nd_0_5 = len(nd_df[nd_df["AGE_YRS"].lt(5) | nd_df["CAGE_YR"].lt(5)])
    d_0_5 = len(d_df[d_df["AGE_YRS"].lt(5) | d_df["CAGE_YR"].lt(5)])
    nd_0_5 = len(nd_df[nd_df["AGE_YRS"].lt(5) | nd_df["CAGE_YR"].lt(5)])
    total_0_5 = d_0_5 + nd_0_5
    d_6_14 = len(d_df[d_df["AGE_YRS"].lt(15) | d_df["CAGE_YR"].lt(15)])
    nd_6_14 = len(nd_df[nd_df["AGE_YRS"].lt(15) | nd_df["CAGE_YR"].lt(15)])
    total_6_14 = d_6_14 + nd_6_14
    d_15_24 = len(d_df[d_df["AGE_YRS"].lt(25) | d_df["CAGE_YR"].lt(25)])
    nd_15_24 = len(nd_df[nd_df["AGE_YRS"].lt(25) | nd_df["CAGE_YR"].lt(25)])
    total_15_24 = d_15_24 + nd_15_24
    d_25_64 = len(d_df[d_df["AGE_YRS"].lt(65) | d_df["CAGE_YR"].lt(65)])
    nd_25_64 = len(nd_df[nd_df["AGE_YRS"].lt(65) | nd_df["CAGE_YR"].lt(65)])
    total_25_64 = d_25_64 + nd_25_64
    d_unknown = len(d_df[d_df["AGE_YRS"].isna() & d_df["CAGE_YR"].isna()])
    nd_unknown = len(nd_df[nd_df["AGE_YRS"].isna() & nd_df["CAGE_YR"].isna()])
    total_unknown = d_unknown + nd_unknown
    return {
        "d_0_5": d_0_5,
        "nd_0_5": nd_0_5,
        "total_0_5": total_0_5,
        "d_6_14": d_6_14 - d_0_5,
        "nd_6_14": nd_6_14 - nd_0_5,
        "total_6_14": total_6_14 - total_0_5,
        "d_15_24": d_15_24 - d_6_14,
        "nd_15_24": nd_15_24 - nd_6_14,
        "total_15_24": total_15_24 - total_6_14,
        "d_25_64": d_25_64 - d_15_24,
        "nd_25_64": nd_25_64 - nd_15_24,
        "total_25_64": total_25_64 - total_15_24,
        "d_65_plus": len(d_df) - d_unknown - d_25_64,
        "nd_65_plus": len(nd_df) - nd_unknown - nd_25_64,
        "total_65_plus": len(d_df) + len(nd_df) - total_unknown - total_25_64,
        "d_unknown": d_unknown,
        "nd_unknown": nd_unknown,
        "total_unknown": total_unknown,
    }


# Outcomes
def analyze_outcomes(year):
    d_df = get_data(year, "DATA")
    nd_df = get_data(year, "DATA", True)
    d_deaths = len(d_df[d_df["DIED"].eq("Y")])
    nd_deaths = len(nd_df[nd_df["DIED"].eq("Y")])
    total_deaths = d_deaths + nd_deaths
    d_hospitilizations = len(d_df[d_df["HOSPITAL"].eq("Y")])
    nd_hospitilizations = len(nd_df[nd_df["HOSPITAL"].eq("Y")])
    total_hospitilizations = d_hospitilizations + nd_hospitilizations
    d_injuries = len(d_df) - d_hospitilizations - d_deaths
    nd_injuries = len(nd_df) - nd_hospitilizations - nd_deaths
    total_injuries = d_injuries + nd_injuries
    return {
        "fatality_percentage": 100 * (total_deaths / (len(d_df) + len(nd_df))),
        "d_deaths": d_deaths,
        "nd_deaths": nd_deaths,
        "total_deaths": total_deaths,
        "d_hospitilizations": d_hospitilizations,
        "nd_hospitilizations": nd_hospitilizations,
        "total_hospitilizations": total_hospitilizations,
        "d_injuries": d_injuries,
        "nd_injuries": nd_injuries,
        "total_injuries": total_injuries,
    }


# Vaccines
def analyze_vaccines(year):
    highest_vaccine_total = {"total": 0}
    vaccines = []
    d_df = get_data(year, "VAX")
    nd_df = get_data(year, "VAX", True)
    d_vaccines = d_df["VAX_TYPE"].drop_duplicates().to_list()
    nd_vaccines = nd_df["VAX_TYPE"].drop_duplicates().to_list()
    vaccines_list = list(set(d_vaccines + nd_vaccines))
    for vaccine in vaccines_list:
        d_total = len(d_df[d_df["VAX_TYPE"].eq(vaccine)])
        nd_total = len(nd_df[nd_df["VAX_TYPE"].eq(vaccine)])
        total = d_total + nd_total
        vaccine_totals = {
            "name": vaccine,
            "vax_type": vaccine,
            "d_total": d_total,
            "nd_total": nd_total,
            "total": total,
        }
        vaccines.append(vaccine_totals)
        if vaccine_totals["total"] > highest_vaccine_total["total"]:
            highest_vaccine_total = vaccine_totals
    return {
        "vaccines_list": vaccines_list,
        "highest_vaccine_total": highest_vaccine_total,
        "totals": vaccines,
    }
