from datetime import date


datasets = ['DATA', 'SYMPTOMS', 'VAX']
months = [
    {"abbreviation": "Jan.", "name": "January"},
    {"abbreviation": "Feb.", "name": "February"},
    {"abbreviation": "Mar.", "name": "March"},
    {"abbreviation": "Apr.", "name": "April"},
    {"abbreviation": "May", "name": "May"},
    {"abbreviation": "Jun.", "name": "June"},
    {"abbreviation": "Jul.", "name": "July"},
    {"abbreviation": "Aug.", "name": "August"},
    {"abbreviation": "Sept.", "name": "September"},
    {"abbreviation": "Oct.", "name": "October"},
    {"abbreviation": "Nov.", "name": "November"},
    {"abbreviation": "Dec.", "name": "December"},
]
years = [str(i) for i in range(1990, int(date.today().year) + 1)]
