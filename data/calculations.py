from analysis import *
from utils import *


def calculate_total_reports(analysis):
    total = 0
    for year in years:
        total += analysis[year]["totals"]["total"]
    return total


def calculate_highest_yearly_total(analysis):
    highest_yearly_total = analysis[years[0]]["totals"]
    for year in years:
        yearly_total = analysis[year]["totals"]
        if yearly_total["total"] > highest_yearly_total["total"]:
            highest_yearly_total = yearly_total
    return highest_yearly_total


def calculate_total_outcomes(analysis):
    d_deaths = 0
    nd_deaths = 0
    total_deaths = 0
    d_hospitilizations = 0
    nd_hospitilizations = 0
    total_hospitilizations = 0
    d_injuries = 0
    nd_injuries = 0
    total_injuries = 0
    for year in years:
        yearly_outcomes = analysis[year]["outcomes"]
        d_deaths += yearly_outcomes["d_deaths"]
        nd_deaths += yearly_outcomes["nd_deaths"]
        total_deaths += yearly_outcomes["total_deaths"]
        d_hospitilizations += yearly_outcomes["d_hospitilizations"]
        nd_hospitilizations += yearly_outcomes["nd_hospitilizations"]
        total_hospitilizations += yearly_outcomes["total_hospitilizations"]
        d_injuries += yearly_outcomes["d_injuries"]
        nd_injuries += yearly_outcomes["nd_injuries"]
        total_injuries += yearly_outcomes["total_injuries"]
    return {
        "fatality_percentage": 100
        * (total_deaths / (total_deaths + total_hospitilizations + total_injuries)),
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


def calculate_total_vaccines(analysis):
    vaccines_list = []
    for year in years:
        vaccines_list = list(
            set(vaccines_list + analysis[year]["vaccines"]["vaccines_list"])
        )

    highest_vaccine_total = {"total": 0}
    vaccines = []
    for vaccine in vaccines_list:
        d_total = 0
        nd_total = 0
        total = 0
        for year in years:
            vaccine_yearly_totals = list(
                filter(
                    lambda v: v["vax_type"] == vaccine,
                    analysis[year]["vaccines"]["totals"],
                )
            )
            if len(vaccine_yearly_totals) > 0:
                vaccine_yearly_totals = vaccine_yearly_totals[0]
                d_total += vaccine_yearly_totals["d_total"]
                nd_total += vaccine_yearly_totals["nd_total"]
                total += vaccine_yearly_totals["total"]
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


calculations = {
    "total_reports": calculate_total_reports,
    "highest_yearly_total": calculate_highest_yearly_total,
    "total_outcomes": calculate_total_outcomes,
    "total_vaccines": calculate_total_vaccines,
}
