/*****
** Complement the grid
*****/
function full_grid(grid_half){
  return grid_half.slice(1,grid_half.length).reverse().concat(grid_half);
}

/*****
** Draw grid in HTML
*****/
function draw_grid_html(grid,n,id){
  var html = ''
  var grid_center = grid[(grid.length-1)/2];
  html += '<div class="info">Grid build of '+ n + ' blocks with center ' + grid_center + ' blocks high</div>';
  html += '<div class="info">['+ grid.toString() + '] = ' + grid.reduce(function(a,b){return a+b;}) + ' blocks</div>';
  html += '<div class="grid">'
  for(var x = 0; x < grid.length; x++){
    var column = '<div class="col">';
    for (var b=1; b <= grid[x]; b++){
      column += '<div class="block"></div>';
    }
    column +='</div>';
    html += column;
  }
  html += '</div>';
  document.getElementById(id).innerHTML = html;

  return html;
}

/*****
** Treat a possibility of one missing/redundant block
*****/

function grid_finalize(grid, blocks, scale_range){
  // Count blocks in grid
  var sum = 0;
  for(var i=0; i<= scale_range; i++){
    if (i==0){
      sum += grid[i];
    } else {
      sum += grid[i]*2;
    }
  }
  // Find redundant/missing block
  var remainder = blocks - sum;
  // Take care of it
  var grid_final = grid.slice();
  if((grid_final[0] + remainder) >= grid[1]){
    grid_final[0] += remainder;
  } else {
    for(var i = grid_final.length-1; i>0; i--){
      if (grid_final[i] > 1){
        grid_final[i]--;
        grid_final[0]++;
        break;
      }
    }
  }
  
  return grid_final;
}

/*****
** Make sure the grid will be always non decresing from its edge to the center
*****/
function iron_grid(grid){
  var ironed_grid = grid.slice();
  var len = ironed_grid.length;
  // If the non descending rule is broken, shift the blocks to the center
  for(var i = len - 1; i > 0; i--){
    if(ironed_grid[i] > ironed_grid[i-1]){
      // Take the blocks breaking the rule
      var diff = ironed_grid[i] - ironed_grid[i-1];
      ironed_grid[i] -= diff;
      // Shift them to the center
      if (i != 1){
        ironed_grid[i-1] += diff;
      } else {
        ironed_grid[0] += 2*diff;
      }
    }
  }

  return ironed_grid;
}

/*****
** Construct the grid
*****/

function build_grid(blocks, scale_range, flatten_ratio){
  // Standard normal ditribution
  var distribution = gaussian(0, 1);
  // Every column will have at least one block, therefore subtract them from the pack of blocks to be distributed
  var blocks_to_distribute = blocks - (2*scale_range+1);
  // Distribution scales from 0 to 3*standard deviation, which is 3 is 
  var step = 3/scale_range;
  // Initialize variables
  var prob_sum = 0;
  var probs = [];
  var prob;
  // Calculate distribution for each scale value
  for(var i=0; i<= scale_range; i++){
    // Distribution value
    prob = distribution.pdf(i*step);
    // Value multiplied by flatten ratio
    prob = Math.pow(prob, flatten_ratio)
    //Save the value
    probs.push(prob);
    if (i==0){
      prob_sum += prob;
    } else {
      prob_sum += 2*prob;
    }
  }
  // Initialize variables
  var block_prob = prob_sum / blocks_to_distribute;
  var grid = []
  var error = 0;
  var blocks_col;
  var blocks_col_round;
  // Calculate number of blocks for each scale value respective to its distribution value
  for(var i=0; i<= scale_range; i++){
    // Calculate number of blocks blocks
    blocks_col = probs[i]/block_prob + error;
    blocks_col_round = Math.round(blocks_col);
    // Get the rounding error
    error = blocks_col - blocks_col_round;
    // Save the blocks to grid
    grid.push(blocks_col_round+1);

    if (i==0){
      error = error /2;
    } 
    if(i > 0){
      //Check the non descending rule
      grid = iron_grid(grid);
    }
  }
  // Finalize grid
  grid = grid_finalize(grid,blocks, scale_range);

  return full_grid(grid);
}