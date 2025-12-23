import math
import matplotlib.pyplot as plt

# Line Balancing 

w = int(input("Enter Avaliable Working Hours per day  : "))
d = int(input("Enter Daily Demand   : "))
takt_time = (w/ d)*3600
print("Takt Time is :", takt_time , "")

# -------------------------------------------------------------------

stations = []

num_stations = int(input("\nEnter number of stations: "))

for i in range(num_stations):
    print(f"\nStation {i + 1}")
    num_processes = int(input("Enter number of processes: "))

    processes = []
    station_total = 0.0

    for j in range(num_processes):
        description = input(f"  Enter description for process {j + 1}: ")
        cycle_time = float(input(f"  Enter cycle time for process {j + 1}: "))

        station_total += cycle_time

        process = {
            "description": description,
            "cycle_time": cycle_time
        }
        processes.append(process)

    # Calculate operators per station
    num_operators = math.ceil(station_total / takt_time)

    stations.append({
        "processes": processes,
        "station_total": station_total,
        "num_operators": num_operators
    })

    print(f"Station {i + 1} total cycle time: {station_total}")
    print(f"Station {i + 1} number of operators required: {num_operators}")


#--------------------------------------------------------------------------------------------

# Visualization


# Prepare data for plotting
station_labels = [f"Station {i+1}" for i in range(len(stations))]
station_cycle_times = [s["station_total"] for s in stations]

# Split bars into green (≤ takt) and red (> takt)
green_part = [min(ct, takt_time) for ct in station_cycle_times]
red_part = [max(0, ct - takt_time) for ct in station_cycle_times]

# Create bar chart
plt.figure()
plt.bar(station_labels, green_part, color="green")
plt.bar(station_labels, red_part, bottom=green_part, color="red")

# Takt time line
plt.axhline(y=takt_time, linestyle="--", label="Takt Time")

# Labels & title
plt.xlabel("Stations")
plt.ylabel("Station Cycle Time (Minutes)")
plt.title("Line Balancing – Station Cycle Time vs Takt Time")
plt.legend()

plt.show()




