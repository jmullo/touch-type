# remove whitespace
sed -r 's/\s+//g' -i $1

# remove words containing numbers
sed '/[[:digit:]]/d' -i $1

# remove punctuation characters except hyphen
sed '/[[:punct:]]*/{s/[^[:alpha:]-]//g}' -i $1

# remove multiple hyphens
sed -r '\-^([^\-]*\-[^\-]*){2,10}$-d' -i $1

# remove leading and trailing hyphens
sed '/^\-/d' -i $1
sed '/\-$/d' -i $1

# remove words shorter than 3 characters
sed -r '/^.{,2}$/d' -i $1

# sort and remove duplicates
sort -u $1 -o $1
