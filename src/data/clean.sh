# remove whitespace
sed -r 's/\s+//g' -i $1

# remove words containing numbers
sed '/[0-9]/d' -i $1

# remove words shorter than 3 characters
sed -r '/^.{,2}$/d' -i $1

# sort and remove duplicates
sort -u $1 -o $1
