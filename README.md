# Q-Grid Generator

Package with a tool to generate a Q-Grid needed in Q-Sorting. This packages contains two different generators - one with linear distribution and one with normal distribution.

Q-Grid is a grid, which is symetrical and non-decreasing from the edge to its center.

## Linear distribution generator

This generator has only one input which is number of blocks in the grid. The output is the broadest possible grid.

You can try it on [JSFiddle](https://jsfiddle.net/bambusekd/4osco5x5/)

## Normal distribution generator

This generator has three inputs - number of blocks, scale range and flatten ratio. It generates a Q-grid, which follows normal distribution (a.k.a. gaussian/bell curve). Scale range defines how wide the grid will be and the flatten ratio can flatten/sharpen the curve.

You can try it on [JSFIddle](https://jsfiddle.net/bambusekd/o3jd62yk/)