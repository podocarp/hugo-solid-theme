# hugo-solid-theme
A solid theme for hugo.

# Features

# Shortcodes
## sliderfigure
Creates a `<figure>` element with a before/after slider.
Plays an animation when it comes into focus. The slider will move right and then left again to entice the user to grab it.

{{< sliderfigure src1="/img/photography/after.jpg" src2="/img/photography/before.jpg" caption="Boom">}}

This is done in pure CSS so unfortunately, mobile browsers cannot drag the handle.
However as a workaround the animation for mobile browsers loop indefinitely.

## lboxfigure
Creates a `<figure>` element with a lightbox effect, i.e. clickable image.

```
{{< lboxfigure thumb="src="/img/example/thumb.png" src="/img/example/1.png" caption="Fig. 1." style="width:10%" >}}
```

The parameters are fairly self explanatory. Something to note is that the style is applied onto the figure, not the image.

## lboxgallery
Creates a gallery that has lazy loading and a lightbox effect, i.e. clickable image.

```
{{< lboxgallery staticURL="static" parentDir="img/hello/" miniThumbDir="/minithumb" thumbDir="/thumb" fullDir="/full" style="width:10%">}}
```

Will produce many images, an example of one will be:

```
<img class="thumbnail lazy" src="/img/hello/minithumb/20705_090958.jpg" data-src="/img/hello/thumb/20705_090958.jpg" style="width:10%">
```

You can provide text within the tags separated by '\' and it will become captioned in the lightbox. For example 

```
{{< lboxgallery ...>}}
caption 1\
caption 2\
 \
caption 4\
{{< /lboxgallery >}}
```

Will give the first 4 images in that directory a caption each except for the third one.
Unfortunately right now there is no way to specify a caption for a specific image.
You will have to create blank captions as shown above to skip images with no captions.

| Param | Purpose |
| --- | --- |
| `staticURL` | The static directory. Most of the time its just "static". Will be omitted in the final URL |
| `style` | CSS styles for the images, defaults to `max-width:100%` |
| `...Dir` | The directory of the images. We cover some of the image types below: |
| minithumb | An extremely small thumbnail to be loaded before lazy loading. Can be left empty to load nothing before that. |
| thumb | The thumbnail to be loaded by lazy loading. Should be a normal thumbnail now. |
| full | The full image to be shown on clicking the image. | 

Suggested ways to get the different images with imagemagick (change sizes to fit your needs):

minithumb (1-3K):

```
 mkdir minithumb;
 mogrify -path minithumb -auto-orient -filter Triangle -dither none -interlace none -colorspace sRGB -quality 20% -thumbnail 32 -density 10 -units pixelsperinch -format jpg *.jpg;
 mogrify -path minithumb -auto-orient -define jpg:fancy-upscaling=off -gaussian-blur 2 -resize 256 -format jpg minithumb/*.jpg
```

thumb (10-20K, mostly around 10-15K):
```
 mkdir thumb;
 mogrify -path thumb -auto-orient -filter Triangle -dither none -interlace none -colorspace sRGB -quality 60% -thumbnail 256 -format jpg *.jpg;
```

full (50K-150K):
```
mkdir full;
mogrify -path full -auto-orient -filter Triangle -dither none -interlace none -colorspace sRGB -quality 80% -resize 600 -format jpg *.jpg;
```