+++ 
draft = true
date = {{ .Date }}
type = "blog"
title = "SERIES Pt. {{.Name}}"
summary = "Part {{.Name}} of SERIESDESC"
tags = [""]
categories = [""]
useFL = true
useFLGallery = true
+++
{{ if le (len .Name) 2 }}
# Part {{ sub (int .Name) 1 }}
Here's [Part {{ sub (int .Name) 1 }}]($/{{ sub (int .Name) 1 }}/) of this series.


# Part {{ add 1 (int .Name) }}
[Part {{ add 1 (int .Name) }}]($/{{ add 1 (int .Name) }}/)!!

{{ end }}
