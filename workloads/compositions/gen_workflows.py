import sys

content = '''
const composer = require('openwhisk-composer')
module.exports = composer.'''

def gen_seq(depth):
    global content
    content += 'seq(\n'
    for i in range(depth):
        content += f"\tcomposer.action('seq{i}', {{action: function () {{return {{ msg: 'seq{i} invoked' }}}}}}),\n"
    else:
        content += ')'
    

if __name__ == "__main__":
    kind = sys.argv[1]
    if kind == 'serial':
        gen_seq(int(sys.argv[2]))  
    
    with open(f"./gen_{kind}.js", 'w') as f:
        f.write(content)   