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


def calculate_total_sexes(analysis):
    d_female = 0
    nd_female = 0
    total_female = 0
    d_male = 0
    nd_male = 0
    total_male = 0
    d_unknown = 0
    nd_unknown = 0
    total_unkown = 0
    for year in years:
        yearly_sexes = analysis[year]["sexes"]
        d_female += yearly_sexes["d_female"]
        nd_female += yearly_sexes["nd_female"]
        total_female += yearly_sexes["total_female"]
        d_male += yearly_sexes["d_male"]
        nd_male += yearly_sexes["nd_male"]
        total_male += yearly_sexes["total_male"]
        d_unknown += yearly_sexes["d_unknown"]
        nd_unknown += yearly_sexes["nd_unknown"]
        total_unkown += yearly_sexes["total_unkown"]
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


def calculate_total_ages(analysis):
    d_0_5 = 0
    nd_0_5 = 0
    total_0_5 = 0
    d_6_14 = 0
    nd_6_14 = 0
    total_6_14 = 0
    d_15_24 = 0
    nd_15_24 = 0
    total_15_24 = 0
    d_25_64 = 0
    nd_25_64 = 0
    total_25_64 = 0
    d_65_plus = 0
    nd_65_plus = 0
    total_65_plus = 0
    d_unknown = 0
    nd_unknown = 0
    total_unknown = 0
    for year in years:
        yearly_ages = analysis[year]["ages"]
        d_0_5 += yearly_ages["d_0_5"]
        nd_0_5 += yearly_ages["nd_0_5"]
        total_0_5 += yearly_ages["total_0_5"]
        d_6_14 += yearly_ages["d_6_14"]
        nd_6_14 += yearly_ages["nd_6_14"]
        total_6_14 += yearly_ages["total_6_14"]
        d_15_24 += yearly_ages["d_15_24"]
        nd_15_24 += yearly_ages["nd_15_24"]
        total_15_24 += yearly_ages["total_15_24"]
        d_25_64 += yearly_ages["d_25_64"]
        nd_25_64 += yearly_ages["nd_25_64"]
        total_25_64 += yearly_ages["total_25_64"]
        d_65_plus += yearly_ages["d_65_plus"]
        nd_65_plus += yearly_ages["nd_65_plus"]
        total_65_plus += yearly_ages["total_65_plus"]
        d_unknown += yearly_ages["d_unknown"]
        nd_unknown += yearly_ages["nd_unknown"]
        total_unknown += yearly_ages["total_unknown"]
    return {
        "d_0_5": d_0_5,
        "nd_0_5": nd_0_5,
        "total_0_5": total_0_5,
        "d_6_14": d_6_14,
        "nd_6_14": nd_6_14,
        "total_6_14": total_6_14,
        "d_15_24": d_15_24,
        "nd_15_24": nd_15_24,
        "total_15_24": total_15_24,
        "d_25_64": d_25_64,
        "nd_25_64": nd_25_64,
        "total_25_64": total_25_64,
        "d_65_plus": d_65_plus,
        "nd_65_plus": nd_65_plus,
        "total_65_plus": total_65_plus,
        "d_unknown": d_unknown,
        "nd_unknown": nd_unknown,
        "total_unknown": total_unknown,
    }


calculations = {
    "total_reports": calculate_total_reports,
    "highest_yearly_total": calculate_highest_yearly_total,
    "total_outcomes": calculate_total_outcomes,
    "total_vaccines": calculate_total_vaccines,
    "total_sexes": calculate_total_sexes,
    "total_ages": calculate_total_ages,
}
