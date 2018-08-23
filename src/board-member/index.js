/**
 * Block dependencies
 */
//import classnames from 'classnames';
import icon from './icon';
import './style.css';
import './editor.css';

/**
 * Internal block libraries
 */

const { Fragment } = wp.element;
const {
    registerBlockType,
} = wp.blocks;
const {
    InspectorControls, RichText,
} = wp.editor;
const {
     Toolbar,
    Button,
    Tooltip,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    IconButton,
    RangeControl,
} = wp.components;


/**
 * Register example block
 */
export default registerBlockType(
    'clb-custom-blocks/board-member',
    {
        title: 'Board Member',
        description:  'Add a new board member to the page.',
        category: 'common',
        icon: {
            foreground: '#fff',
            background: '#489163',
            src: icon,
        },
        keywords: [
            'board',
            'member',
            'directors'
        ],
        attributes: {
             name: {
                type: 'string',
                source: 'text',
                selector: '.board-member-name',
             },
             title: {
                type: 'string',
                source: 'text',
                selector: '.board-member-title',
             },
             website: {
                type: 'string',
                source: 'text',
                selector: '.board-member-website',
             },
             bio: {
                 type: 'array',
                 source: 'children',
                 selector: '.board-member-bio-body',
             }
        },

        edit: props => {
            const { attributes: { name, title, website, bio }, className, isSelected, setAttributes } = props;
            const onChangeName = name => { setAttributes( { name } ) };
            const onChangeTitle = title => { setAttributes( { title } ) };
            const onChangeWebsite = website => { setAttributes( { website } ) };
            const onChangeBio = bio => { setAttributes( { bio } ) };

            return (
                <div className={ className }>
                { isSelected ? (
                     <div className ={ className + "-selected" } >
                     <TextControl
                          className='board-member-name-input'
                          label={ 'Name' }
                          value={ name }
                          placeholder={ 'Jane Doe' }
                          onChange={ onChangeName }
                     />
                     <TextControl
                          className='board-member-title-input'
                          label={ 'Title' }
                          value={ title }
                          placeholder={ 'Optional' }
                          onChange={ onChangeTitle }
                     />
                     <TextControl
                          className='board-member-website-input'
                          label={ 'Website' }
                          value={ website }
                          placeholder={ 'Optional' }
                          onChange={ onChangeWebsite }
                     />
                     <h4>Bio</h4>
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ 'Add your custom bio' }
                  		onChange={ onChangeBio }
                  		value={ bio }
              		/>
                    </div>
               ) : (
                  <div class="static-board-member">
                       <p>Board Member: {name}</p>
                  </div>
               )}
                </div>
            );
        },
        save: props => {
                    const { attributes: { name, title, website, bio } } = props;
                    return (
                        <div class="board-member-area">
                             <div class="board-member-name">
                                 <h2>{ name }</h2>
                             </div>
                             <div class="board-member-title">
                                 { title }
                             </div>
                             <div class="board-member-website">
                                 { website }
                             </div>
                            <div class="bio-header">Bio</div>
                            <div class="board-member-bio-body">
                                { bio }
                            </div>
                        </div>
                    );
                },
    },
);
