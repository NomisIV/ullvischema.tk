import json

unformatted_student_list = [line.rstrip('\n') for line in open("students.txt")]

students = {}

for student in unformatted_student_list:
    tag = student[15:53]
    data = student[55:-9]
    class_name = data.split("  ")[0]
    name = data.split("  ")[1]
    first_name = name.split(", ")[1]
    last_name = name.split(", ")[0]
    #print(tag + ": " + first_name + " " + last_name + " " + class_name)

    try:
        students[class_name][first_name + " " + last_name] = tag
    except KeyError:
        students[class_name] = {}
        students[class_name][first_name + " " + last_name] = tag

with open('students.json', 'w') as f:  
    json.dump(students, f)