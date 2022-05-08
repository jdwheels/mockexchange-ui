#!/usr/bin/env sh
index_file=/usr/share/nginx/html/index.html
envsubst < $index_file > $index_file.tmp
mv $index_file.tmp $index_file
cat $index_file
