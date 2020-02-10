pandoc ^
    --from markdown+smart ^
    --standalone ^
    --to=revealjs ^
    --no-highlight ^
    --slide-level=2 ^
    --template=templates\template.reveal.html ^
    --variable backgroundTransition="slide" ^
    --variable hash=true ^
    --variable slideNumber=true ^
    --variable controlsTutorial=false ^
    --variable revealjs-url="http://webprogramozas.inf.elte.hu/webprog/ea/revealjs" ^
    %1/slides.md ^
    > %1/index.html
