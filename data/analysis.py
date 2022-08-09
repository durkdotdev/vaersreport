from data import get_data
from redis_db import redis_get
from utils import *


def analysis_year_keys_and_analysis(year):
    return {
      "totals": {"analysis": analyze_totals, "args": [year], "key": f"{year}:totals"},
      "totals_monthly": {"analysis": analyze_totals_monthly, "args": [year], "key": f"{year}:totals:monthly"},
      "growth": {"analysis": analyze_growth, "args": [year], "key": f"{year}:growth"},
      "outcomes": {"analysis": analyze_outcomes, "args": [year], "key": f"{year}:outcomes"},
      "vaccines": {"analysis": analyze_vaccines, "args": [year], "key":f"{year}:vaccines"}
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
      "total": total
    }


def analyze_totals_monthly(year):
    d_df = get_data(year, "DATA")
    nd_df = get_data(year, "DATA", True)
    totals = []
    for index, month in enumerate(months):
        d_total = len(d_df[d_df["RECVDATE"].str[:2].eq(str(index) if index > 9 else f"0{str(index)}")])
        nd_total = len(nd_df[nd_df["RECVDATE"].str[:2].eq(str(index) if index > 9 else f"0{str(index)}")])
        total = d_total + nd_total
        totals.append(
            {
                **month,
                "d_total": d_total,
                "nd_total": nd_total,
                "total": total,
            }
        )
    return totals


# Growths
def analyze_growth(year):
    index = years.index(year)
    d_growth = 0
    nd_growth = 0
    total_growth = 0
    if index != 0:
      past_total = redis_get(analysis_year_keys_and_analysis(years[index -1])["totals"]["key"])
      present_total = redis_get(analysis_year_keys_and_analysis(years[index])["totals"]["key"])
      d_growth = 100 * ((present_total["d_total"] - past_total["d_total"]) / past_total["d_total"])
      nd_growth = 100 * ((present_total["nd_total"] - past_total["nd_total"]) / past_total["nd_total"])
      total_growth = 100 * ((present_total["total"] - past_total["total"]) / past_total["total"])
    return {
      "d_growth": d_growth,
      "nd_growth": nd_growth,
      "total_growth": total_growth
    }


# Outcomes
def analyze_outcomes(year):
    d_df = get_data(year, "DATA")
    nd_df = get_data(year, "DATA", True)
    d_deaths = len(d_df[d_df["DIED"].eq("Y")])
    nd_deaths = len(nd_df[nd_df["DIED"].eq("Y")])
    total_deaths = d_deaths + nd_deaths
    d_injuries = len(d_df) - d_deaths
    nd_injuries = len(nd_df) - nd_deaths
    total_injuries = d_injuries + nd_injuries
    return {
      "d_deaths": d_deaths,
      "nd_deaths": nd_deaths,
      "total_deaths": total_deaths,
      "d_injuries": d_injuries,
      "nd_injuries": nd_injuries,
      "total_injuries": total_injuries
    }


# Vaccines
def analyze_vaccines(year):
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
        vaccines.append(
          {
            "vax_type": vaccine,
            "d_total": d_total,
            "nd_total": nd_total,
            "total": total
          }
        )
    return vaccines