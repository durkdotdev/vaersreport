from redis_db import redis_search
import pandas


def get_data(year, dataset, nondomestic=False):
    return pandas.read_json(
        redis_search(
            get_data_key(year, dataset, nondomestic),
            read_data,
            year,
            dataset,
            nondomestic,
        ),
        orient="split",
    )


def read_data(year, dataset, nondomestic=False):
    return pandas.read_csv(
        f"./csv/{get_data_filename(year, dataset, nondomestic)}.csv",
        encoding="latin1",
        engine="python",
    ).to_json(orient="split")


def get_data_filename(year, dataset, nondomestic):
    return (
        f"nondomestic{year}VAERS{dataset}" if nondomestic else f"{year}VAERS{dataset}"
    )


def get_data_key(year, dataset, nondomestic):
    return f"nondomestic:{year}:{dataset}" if nondomestic else f"{year}:{dataset}"
